#!/usr/bin/python
import sys
import wmi

w = wmi.WMI()
print w.Win32_TemperatureProbe()[0].CurrentReading
#print('{0:0.1f},{1:0.1f}'.format(temperature, humidity))
