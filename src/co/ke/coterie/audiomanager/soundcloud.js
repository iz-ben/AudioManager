/**
 * @package   AudioManager
 * @author    Ben <ben@coterie.co.ke>
 * @link      http://coterie.co.ke
 * SoundCloud Audio Bridge
 * https://developers.soundcloud.com/docs/api/guide
 */
 
goog.provide('co.ke.coterie.audio.SoundCloud');


/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {string} source_url The url from where the audio will be played 
 * This class manages resolving of sounds loaded from SoundCloud and returns the stream url
*/
co.ke.coterie.audio.SoundCloud = function( source_url )
{
	goog.events.EventTarget.call(this);
	
	this.audioUri = new goog.Uri( source_url );
}

goog.inherits( co.ke.coterie.audio.SoundCloud, goog.events.EventTarget );

/**
 * @enum {string}
 */
co.ke.coterie.audio.SoundCloud.SETTINGS = {
	RESOLVE_URL:''
}

/**
 * @type {string|null|undefined}
 */
co.ke.coterie.audio.SoundCloud.API_KEY;


/**
 * @type {goog.Uri|null|undefined}
 */
co.ke.coterie.audio.SoundCloud.prototype.audioUri;

co.ke.coterie.audio.SoundCloud.prototype.resolve = function()
{
	var uri = new goog.Uri( co.ke.coterie.audio.SoundCloud.SETTINGS.RESOLVE_URL ),
	
	jsonp = new goog.net.Jsonp(	uri );
	
	jsonp.send
	( 
		{ 
			'client_id' : co.ke.coterie.audio.SoundCloud.API_KEY, 
			'url': this.audioUri.toString()
		}, 
		goog.bind( this.success, this ),
		
		goog.bind( this.error, this )
	);
	
}

co.ke.coterie.audio.SoundCloud.prototype.success = function()
{
	
}

co.ke.coterie.audio.SoundCloud.prototype.error = function()
{
	
}

co.ke.coterie.audio.SoundCloud.isValid = function( audio_url )
{
	var uri = new goog.Uri( audio_url );
	
	return 'soundcloud.com' == uri.getDomain() ? true : false;
}
