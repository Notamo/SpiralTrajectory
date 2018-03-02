/*
 * File: BossBattle_buildLevel.js 
 * This is the logic for building the static level of
 * the BossBattle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain,
  ArrowVector, Torch, Config, BossBattle */

"use strict";

// Initializes some platforms for the boss fight
BossBattle.prototype.buildLevel = function () {
    // Create the boundary for the battle
    // Create the floor
    this.mPhysicsGameObjects.addToSet(new Terrain(
        Config.BossBattle.Textures.GroundTexture,
        150, -55,
        300, 150 
    ));
    
    // Create the roof  
    // do we want a roof?

    // Create the left wall 
    this.mPhysicsGameObjects.addToSet(new Terrain(
        Config.BossBattle.Textures.WallTexture,
        -100, 0,
        200, 1000
    ));

    // Create the right wall
    this.mPhysicsGameObjects.addToSet(new Terrain(
        Config.BossBattle.Textures.WallTexture,
        400, 0,
        200, 1000
    ));
    
    // Create the platforms
    this.mPhysicsGameObjects.addToSet(new Platform(
        Config.BossBattle.Textures.PlatformTexture,
        40, 30,
        20, 5
    ));
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        Config.BossBattle.Textures.PlatformTexture,
        120, 30,
        20, 5
    ));
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        Config.BossBattle.Textures.PlatformTexture,
        80, 60,
        20, 5
    ));
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        Config.BossBattle.Textures.PlatformTexture,
        20, 80,
        20, 5
    ));
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        Config.BossBattle.Textures.PlatformTexture,
        140, 80,
        20, 5
    ));
    
    // Torches
    this.mPhysicsGameObjects.addToSet(new Torch(
        Config.BossBattle.Textures.TorchTexture,
    ));
};