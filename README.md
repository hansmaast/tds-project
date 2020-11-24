
#### Run the project:
Install dependencies: ````yarn install````   
Build Web and iOs: ````yarn build:ios````       
Build Web and Android: ````yarn build:android````       
Build Web: ````yarn build````   
Run Web: ``ìonic serve``
    

Because the project uses [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/), it will not run in the android emulator.
Issued [here](https://issuetracker.google.com/issues/37129533).

I made this project using the iOs simulator, and I have no android device available, so please be aware of android related bugs.    
Hopefully I will test it on Android in the near future.

#### Known issues:
* Sometimes the the animation seems 'transparent', and displays the previous view for some seconds.
* 'You need to login' prompts when logged in.
* 'Login' always redirects to home.
* No offline storage implemented.
