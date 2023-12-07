struct Uniforms {
  modelViewProjectionMatrix : mat4x4<f32>,
}
@binding(0) @group(0) var<uniform> uniforms : Uniforms;
@binding(1) @group(0) var<uniform> baseColor : vec4<f32>;

struct VertexOutput {
  @builtin(position) Position : vec4<f32>,
  @location(0) fragUV : vec2<f32>,
  @location(1) fragPosition: vec4<f32>,
}

@vertex fn mainVertex(
  @location(0) position : vec4<f32>,
) -> VertexOutput {
  var output : VertexOutput;
  output.Position = uniforms.modelViewProjectionMatrix * position;

  output.fragPosition = position;
  return output;
}

@fragment fn mainFragment(
  @location(0) fragUV: vec2<f32>,
  @location(1) fragPosition: vec4<f32>
) -> @location(0) vec4<f32> {
  return baseColor;
}
