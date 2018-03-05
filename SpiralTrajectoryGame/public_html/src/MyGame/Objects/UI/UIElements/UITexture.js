/* File: UITex
 *      a plain textured UI Element
 */

function UITexture(myTexture, position, size) {
    this.mTex = new TextureRenderable(myTexture);
    UIElement.call(this, this.mTex, position, size);
}
gEngine.Core.inheritPrototype(UITexture, UIElement);

