# Thingy52 nodejs library loaded with OSC feature

TODO bluetooth discovery 
thingy.js:72 localName property is the name that can be changed thru nordic smartphone app
noble-device.js:75 connectAndSetup to check if proper localName else disconnect and restart discovering

TODO clean stuff properly, add OSC paths for all the features

TODO remap values?

TODO check OS X and WIN
 
https://github.com/NordicPlayground/Nordic-Thingy52-Nodejs

Requirements as from
https://github.com/NordicPlayground/Nordic-Thingy52-Nodejs
```shell
$ npm i --save osc
```
```shell
$ npm i --save noble-device
```
https://github.com/noble/noble-device
```shell
$ npm i --save noble
```
https://github.com/noble/noble

eventually if needed:
```shell
$ npm i --save bluetooth-hci-socket
$ npm i --save usb
```
```shell
$ npm i --save thingy52
```
tested on
Linux air 4.9.0-8-amd64 #1 SMP Debian 4.9.110-3+deb9u4 (2018-08-21) x86_64 GNU/Linux

## Usage
```shell
$ sudo node receiver.js
```




