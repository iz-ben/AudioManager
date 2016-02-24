/**
 * @package   Audio Manager
 * @author    Ben <ben@coterie.co.ke>
 * @link      http://coterie.co.ke
 * Instantiates audioManager
 */
goog.provide('audioManager');

goog.require('co.ke.coterie.audio.Manager');


audioManager = new co.ke.coterie.audio.Manager;

goog.exportSymbol( 'audioManager', audioManager );