# AudioManager

This began as just a way of understanding Web Audio but moved on to become something more interesting.

The framework is capable of playing most audio filetypes and is compatible with most modern browsers.

It has the ability to extract frequency, waveforms and other data from an audio source without having to resort to flash. This can be used for audio visualizations and more. It's all about creativity.

It is able to stream large audio files immediately without waiting for the browser to retrieve the whole file.

It has the ability to play Soundcloud links provided that a Soundcloud client key is provided.

## Implementation example

### Playing hosted sounds

```

var audiomanager = AudioManager;

var blue = audiomanager.createSound('[ full web accesible url ]/eiffel65-blue.mp3','Eiffel 65 - Blue');

audiomanager.play();

```

### Play from Soundcloud

```

var audiomanager = AudioManager;

//Set your soundcloud key
audiomanager.setSCKey('[client_key]');

var violin = audiomanager.createSound('https://soundcloud.com/amirra-salleh/when-the-violin-speaks','Amira Saleh2 - when the violin talks');

audiomanager.play();

```

## Compiling

The framework is built using Google's Closure Library, and the distribution files have been compiled using Google's Closure Compiler.

# Resources

- [Closure Library](https://developers.google.com/closure/library/)
- [Closure Compiler](https://developers.google.com/closure/compiler/)

Register Soundcloud app and get the client key from the [developers section](https://developers.soundcloud.com/) of their website.






