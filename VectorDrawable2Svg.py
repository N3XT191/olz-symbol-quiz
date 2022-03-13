#!/usr/bin/env python2
"""
VectorDrawable2Svg
This script convert your VectorDrawable to a Svg
Author: Alessandro Lucchet

Usage: drop one or more vector drawable onto this script to convert them to svg format
"""

from xml.dom.minidom import *
import glob
import os
import sys

SOURCE = 'src/data/drawable/*'
DESTINATION = 'public/drawable/'

# extracts all paths inside vdContainer and add them into svgContainer
def convertPaths(vdContainer,svgContainer,svgXml):
	vdPaths = vdContainer.getElementsByTagName('path')
	for vdPath in vdPaths:
		# only iterate in the first level
		if vdPath.parentNode == vdContainer:
			svgPath = svgXml.createElement('path')
			svgPath.attributes['d'] = vdPath.attributes['android:pathData'].value
			if vdPath.hasAttribute('android:fillColor'):
				svgPath.attributes['fill'] = vdPath.attributes['android:fillColor'].value
			else:
				svgPath.attributes['fill'] = 'none'
			if vdPath.hasAttribute('android:strokeLineJoin'):
				svgPath.attributes['stroke-linejoin'] = vdPath.attributes['android:strokeLineJoin'].value
			if vdPath.hasAttribute('android:strokeLineCap'):
				svgPath.attributes['stroke-linecap'] = vdPath.attributes['android:strokeLineCap'].value
			if vdPath.hasAttribute('android:strokeMiterLimit'):
				svgPath.attributes['stroke-miterlimit'] = vdPath.attributes['android:strokeMiterLimit'].value
			if vdPath.hasAttribute('android:strokeWidth'):
				svgPath.attributes['stroke-width'] = vdPath.attributes['android:strokeWidth'].value
			if vdPath.hasAttribute('android:strokeColor'):
				svgPath.attributes['stroke'] = vdPath.attributes['android:strokeColor'].value
			svgContainer.appendChild(svgPath);
		
# define the function which converts a vector drawable to a svg
def convertVd(vdFilePath, svgFilePath = None):

	# create svg xml
	svgXml = Document()
	svgNode = svgXml.createElement('svg')
	svgXml.appendChild(svgNode);

	# open vector drawable
	vdXml = parse(vdFilePath)
	vdNode = vdXml.getElementsByTagName('vector')[0]

	# setup basic svg info
	svgNode.attributes['xmlns'] = 'http://www.w3.org/2000/svg'
	svgNode.attributes['width'] = str(float(vdNode.attributes['android:viewportWidth'].value)*25)
	svgNode.attributes['height'] = str(float(vdNode.attributes['android:viewportHeight'].value)*25)
	svgNode.attributes['viewBox'] = '0 0 {} {}'.format(vdNode.attributes['android:viewportWidth'].value, vdNode.attributes['android:viewportHeight'].value)

	# iterate through all groups
	vdGroups = vdXml.getElementsByTagName('group')
	for vdGroup in vdGroups:
	
		# create the group
		svgGroup = svgXml.createElement('g')
		
		# setup attributes of the group
		if vdGroup.hasAttribute('android:translateX'):
			svgGroup.attributes['transform'] = 'translate({},{})'.format(vdGroup.attributes['android:translateX'].value,vdGroup.attributes['android:translateY'].value)
		
		# iterate through all paths inside the group
		convertPaths(vdGroup,svgGroup,svgXml)
			
		# append the group to the svg node
		svgNode.appendChild(svgGroup);

	# iterate through all svg-level paths
	convertPaths(vdNode,svgNode,svgXml)

	# write xml to file
	if svgFilePath is None:
		svgFilePath = vdFilePath + '.svg'
	svgXml.writexml(open(svgFilePath, 'w'),indent="",addindent="  ",newl='\n')
	
# script begin
for vd_path in glob.glob(SOURCE):
	svg_path = os.path.join(DESTINATION, os.path.basename(vd_path) + '.svg')
	print(vd_path, svg_path)
	convertVd(vd_path, svg_path)
