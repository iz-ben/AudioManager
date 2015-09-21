/**
 * @package   Audio Manager
 * @author    Ben <ben@coterie.co.ke>
 * @link      http://coterie.co.ke
 * References
 *  - https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource
 *  - https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createAnalyser
 */
 
goog.provide('co.ke.coterie.audio.Sound');


goog.require('goog.events.EventTarget');
goog.require('goog.Uri');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {co.ke.coterie.audio.Manager} audioManager
 * @param {string} source_url The url from where the audio will be played
 * @param {string} title The title of the current sound
 
 * This class will basically create and 
 * manage an audio instance using web audio
*/
co.ke.coterie.audio.Sound = function( audioManager, source_url, title )
{
	goog.events.EventTarget.call(this);	
	
	this.audioManager = audioManager;
	
	this.setVolume();
	
	this.setTitle( title );
	
	this.streamUrl = new goog.Uri( source_url );
	
	goog.events.listen( this.audioManager,  co.ke.coterie.audio.Manager.EventType.VOLUMECHANGE, this.setVolume, true, this );
	
	this.setup();
}

goog.inherits( co.ke.coterie.audio.Sound, goog.events.EventTarget );

/**
 * @type {co.ke.coterie.audio.Manager} Stores a reference to the audio manager instance
 * that created the sound
 */
co.ke.coterie.audio.Sound.prototype.audioManager;

/**
 * By default this will take the value provided by its audioManager
 * @type {number}
 */
co.ke.coterie.audio.Sound.prototype.volume_ = 0;

/**
 * @type {string}
 */
co.ke.coterie.audio.Sound.prototype.title_ = '';

/**
 * @type {goog.Uri}
 */
co.ke.coterie.audio.Sound.prototype.streamUrl;

/**
 * @type {Audio}
 */
co.ke.coterie.audio.Sound.prototype.audio_;

/**
 * @type {AudioContext}
 */
co.ke.coterie.audio.Sound.prototype.audioContext_;

/**
 * @type {AudioGain}
 */
co.ke.coterie.audio.Sound.prototype.gain_;

/**
 * @type {RealtimeAnalyserNode}
 */
co.ke.coterie.audio.Sound.prototype.analyser_;

/**
 * @type {MediaElementAudioSourceNode}
 */
co.ke.coterie.audio.Sound.prototype.mediaElementSource_;

/**
 * Animation frame id
 * @type {number}
 */
co.ke.coterie.audio.Sound.prototype.animationFrame = 0;

/**
 * 
 */
co.ke.coterie.audio.Sound.prototype.setVolume = function()
{
	this.volume_ = this.audioManager.getVolume();
	
	if( this.getGain() )
	{
		this.getGain()['value']  = this.getVolume()/100;
	}
}

/**
 * @return {number}
 */
co.ke.coterie.audio.Sound.prototype.getVolume = function()
{
	return this.volume_;
}

/**
 * @param {string} title
 */
co.ke.coterie.audio.Sound.prototype.setTitle = function( title )
{
	this.title_ = title;
}

/**
 * @return {string}
 */
co.ke.coterie.audio.Sound.prototype.getTitle = function()
{
	return this.title_;
}

/**
 * @return {Audio}
 */
co.ke.coterie.audio.Sound.prototype.getAudio = function()
{
	//create new Audio instance on demand if being fetched for the first time
	this.audio_ = this.audio_ || new Audio;
	
	return this.audio_;
}

/**
 * @return {AudioGain}
 */
co.ke.coterie.audio.Sound.prototype.getGain = function()
{
	return this.gain_;
}

/**
 * @return {AudioContext}
 */
co.ke.coterie.audio.Sound.prototype.getContext = function()
{
	this.audioContext_ = this.audioContext_ || new AudioContext;
	return this.audioContext_;
}

/**
 * @return {RealtimeAnalyserNode}
 */
co.ke.coterie.audio.Sound.prototype.getAnalyser = function()
{
	return this.analyser_;
}

/**
 * @return {MediaElementAudioSourceNode}
 */
co.ke.coterie.audio.Sound.prototype.getElementSource = function()
{
	
	return this.mediaElementSource_;
}


co.ke.coterie.audio.Sound.prototype.setup = function()
{
	//setup Audio instance	
	
	this.getAudio()['controls'] = false;
	
	this.getAudio()['autoplay'] = false;
	
	//setup Contexts
	
	this.mediaElementSource_ = this.getContext()['createMediaElementSource']( this.getAudio() );
	this.gain_ = this.getContext()['createGain']();
	this.analyser_ = this.getContext()['createAnalyser']();
	
	// setup audio filter paths
	this.getElementSource()['connect']( this.getGain() );
	
	this.getGain()['connect']( this.getAnalyser() );
	
	this.getAnalyser()['connect']( this.getContext()['destination'] );
	
	this.getAudio()['crossOrigin'] = 'anonymous';
	
	this.getAudio()['src'] = this.streamUrl.toString();
}

/**
 * Place functions that you want to fired with the animationFrame here
 */
co.ke.coterie.audio.Sound.prototype.draw = function()
{
	this.animationFrame = window.requestAnimationFrame( goog.bind( this.draw, this ) );
}

co.ke.coterie.audio.Sound.prototype.play = function()
{
	this.animationFrame = window.requestAnimationFrame( goog.bind( this.draw, this ) );
	
	this.getAudio()['play']();
}