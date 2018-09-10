[![CircleCI](https://circleci.com/gh/jozefdransfield/sony-audio.svg?style=svg)](https://circleci.com/gh/jozefdransfield/sony-audio)

#Sony-Audio API

This API allows you to connect and send remote control commands to the following Sony devices:
   - SRS-ZR5 
   - STR-DN1080 
   - HT-MT500 
   - HT-CT800 
   - HT-ST5000 
   - HT-ZF9 

##Setup

From the device or using Bonjour you can discover the IP address of your audio device, then the following code will allow you to setup a remote control object;

    const remoteFor = require('sony-audio');
    const ampRemote = await remoteFor('http://<ip-address>:<port>');
    
   
Now your remote control object is initialised and ready to execute commands:

    await ampRemote.turnOn();
    await ampRemote.turnOff();

