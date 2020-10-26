from picamera import PiCamera
from time import sleep
from pynput.keyboard import Key, Listener, Controller
import os
import requests
import json
import pyrebase

#config = {
#your firebase config info 
#}

postData = {
    "homeMobileCountryCode": 310,
    "homeMobileNetworkCode": 410,
    "carrier": "Vodafone",
    "considerIp": "true",
    "cellTowers": [],
    "wifiAccessPoints": [
        {
            "macAddress": "8a:23:a7:d5:e6:5f",
            "signalStrength": -63,
            "age": 0,
            "channel": 11,
            "signalToNoiseRatio": 0
        },
        {
            "macAddress": "2e:3f:d5:04:1b:93",
            "signalStrength": -43,
            "age": 0,
            "channel": 11,
            "signalToNoiseRatio": 0
        }
    ]
}

# 'https://www.googleapis.com/geolocation/v1/geolocate?key=YOURKEY'


camera = PiCamera()
url = 'http://192.168.0.101:4000'
camera.resolution = (800, 600)

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
offset = 0.0000001
photo_counter = 0

camera.start_preview(alpha=200)
for i in range(5):

    postUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=YOURKEY'
    r_coord = requests.post(postUrl, json=postData)
    #print(json.loads(r_coord.text))
    
    #camera.capture('/home/pi/Desktop/photos/image%s.jpg' % i)
    filename = 'image.jpg'
    camera.capture('/home/pi/Desktop/photos/' + filename)
    
    
    
        
    #analyze image
    endpoint = "https://litter-vision.cognitiveservices.azure.com/"
    analyze_url = endpoint + "vision/v3.1/analyze"
    
    
    image_path = '/home/pi/Desktop/photos/' + filename
    image_data = open(image_path, "rb").read()
    headers = {'Ocp-Apim-Subscription-Key': "YOUR KEY",
               'Content-Type': 'application/octet-stream'}
    params = {'visualFeatures': 'Tags'}
    response = requests.post(
        analyze_url, headers=headers, params=params, data=image_data)
    response.raise_for_status()
    
    
    analysis = response.json()
    print(analysis)
    
    
    
    #send photo to sever
    #data = open('/home/pi/Desktop/photos/' + filename, 'rb').read()
    #data = {'files' : open('/home/pi/Desktop/photos/' + filename, 'rb').read()}
    s = requests.Session()
    headers = {'Content-Type': 'application/json',
              'Accept': '*/*',
              'Authorization': 'Bearer <redacted>'}
     
    
    #r = s.post(url, headers=headers, files=files)
    valid_trash = ['waste', 'trash', 'plastic', 'plastic bag', 'bin bag', 'bin', 'cluttered']
    for i in range(len(analysis['tags'])):
        if analysis['tags'][i]['name'] in valid_trash and analysis['tags'][i]['confidence'] > 0.1:
            
            #r = requests.post(url, data = {'message' : response, 'position' : r_coord})
            #r = requests.post(url, data = {'position' : r_coord})
            #print(r)
            
            lat = json.loads(r_coord.text)['location']['lat'] + offset * photo_counter
            lng = json.loads(r_coord.text)['location']['lng'] + offset * photo_counter
            cloudfilename = "images/" + str(lat) + "," + str(lng)
            
            storage.child(cloudfilename).put(image_path)
            
            print("SUCCSESS")
            
            photo_counter += 1

    
    os.remove('/home/pi/Desktop/photos/' + filename)
    
    sleep(2)
    
    
    
camera.stop_preview()
    






