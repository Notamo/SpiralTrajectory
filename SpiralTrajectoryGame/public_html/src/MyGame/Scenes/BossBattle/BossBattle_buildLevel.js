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
    this.createGround();
    this.createWalls();
    this.createPlatforms();
    this.createTorches();
};

BossBattle.prototype.createGround = function () {
    for (var ground in Config.BossBattle.Ground) {
        this.mPhysicsGameObjects.addToSet(new Terrain(
            Config.BossBattle.Textures.GroundTexture,
            Config.BossBattle.Ground[ground].X,
            Config.BossBattle.Ground[ground].Y,
            Config.BossBattle.Ground[ground].Width,
            Config.BossBattle.Ground[ground].Height
        ));
    }
};

BossBattle.prototype.createWalls = function () {
    for (var wall in Config.BossBattle.Walls) {
        this.mPhysicsGameObjects.addToSet(new Terrain(
            Config.BossBattle.Textures.WallTexture,
            Config.BossBattle.Walls[wall].X,
            Config.BossBattle.Walls[wall].Y,
            Config.BossBattle.Walls[wall].Width,
            Config.BossBattle.Walls[wall].Height
        ));
    }
};

BossBattle.prototype.createPlatforms = function () {
    for (var platform in Config.BossBattle.Platforms) {
        this.mPhysicsGameObjects.addToSet(new Platform(
            Config.BossBattle.Textures.PlatformTexture,
            Config.BossBattle.Platforms[platform].X,
            Config.BossBattle.Platforms[platform].Y,
            Config.BossBattle.Platforms[platform].Width,
            Config.BossBattle.Platforms[platform].Height
        ));
    }
};

BossBattle.prototype.createTorches = function () {
    for (var torch in Config.BossBattle.Torches.Ground) {
        this.mPhysicsGameObjects.addToSet(new Torch (
            Config.BossBattle.Textures.GroundTorchTexture,
            Config.BossBattle.Torches.Ground[torch].X,
            Config.BossBattle.Torches.Ground[torch].Y,
            Config.BossBattle.Torches.Ground[torch].Width,
            Config.BossBattle.Torches.Ground[torch].Height,
            Config.Torch.Types.Ground
        ));
    }
};