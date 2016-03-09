/**
 * @package   AudioManager
 * @author    Ben <ben@coterie.co.ke>
 * @link      http://coterie.co.ke
 * setup global contructor name AudioManager
 */
goog.provide('AudioManager');

goog.require('co.ke.coterie.audio.Manager');


AudioManager = co.ke.coterie.audio.Manager;

goog.exportSymbol( 'AudioManager', AudioManager );