struct Uniforms {
  modelViewProjectionMatrix : mat4x4 < f32>,
  baseColor : vec4 < f32>,
}
@group(0) @binding(0) var<uniform> uniforms : Uniforms;
@group(0) @binding(1) var mySampler : sampler;
@group(0) @binding(2) var myTexture : texture_2d<f32>;
@group(0) @binding(3) var<storage, read> uvStorage : array<vec2 < f32>>;

struct VertexOutput {
  @builtin(position) Position : vec4 < f32>,
  @location(0) fragUV : vec2 < f32>,
  @location(1) fragPosition : vec4 < f32>,
}

@vertex fn mainVertex(
@builtin(vertex_index) index : u32,
@location(0) position : vec4 < f32>,
@location(1) normal : vec3 < f32>,
@location(2) uvIndex : u32,
) -> VertexOutput {
  var output : VertexOutput;
  output.Position = uniforms.modelViewProjectionMatrix * position;
  output.fragUV = uvStorage[uvIndex];

  output.fragPosition = vec4(1, 1, 1, 1);
  if(uvStorage[uvIndex].x > 0.624)
  {
   // output.fragPosition = vec4(1, 0, 0, 1);
  }

  return output;
}

@fragment fn mainFragment(
@location(0) fragUV : vec2 < f32>,
@location(1) fragPosition : vec4 < f32>
) -> @location(0) vec4 < f32> {

  return textureSample(myTexture, mySampler, fragUV) * fragPosition;
}
