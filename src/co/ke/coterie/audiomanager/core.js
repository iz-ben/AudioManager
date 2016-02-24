/**
 * @package   Audio Manager
 * @author    Ben <ben@coterie.co.ke>
 * @link      http://coterie.co.ke
 * Instantiates audioManager
 */
goog.provide('AudioManager');

goog.require('co.ke.coterie.audio.Manager');


AudioManager = new co.ke.coterie.audio.Manager;

goog.exportSymbol( 'AudioManager', AudioManager );