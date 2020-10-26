# ecomake-map
Using the camera module on a raspberry PI 4, we take pictures after a certain interval and then send a POST request to microsoft Azure's computer vision AI that detects objects.
We use the returned description of the image to decide whether the litter is detected, if litter is detected we store the image file along with it's geographical coordinates on a firebase storage database.
Using the react app, we display the position of each image on a google map (react-google-map) at the corresponding latitude and longitude.

Ecomake 2020 3rd place winner project - Made by Dan Peerapatanapokin, Grayson Harralson, Kenneth Wong and Ibrahim Saeed.

![Image of demo](https://github.com/IbrahimSaeedPurdue/ecomake-map/blob/main/ecomake-map.png)
