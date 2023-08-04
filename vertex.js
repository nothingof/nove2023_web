const vertexShader = /* glsl */ `

precision lowp float;
// precision mediump float;
precision highp int;

uniform float u_intensity;
uniform float u_time;

uniform float windowSize;
uniform float uvRange;
uniform float divide;
uniform float pRect;

varying vec2 vUv;
varying vec3 vVertex;
varying float vDisplacement;
varying vec3 vPosition;

// https://www.generativehut.com/post/generative-terrain-nfts-for-fxhash-in-three-js
float hash(uvec2 x) {
    uvec2 q = 1103515245U * ((x>>1U)^(x.yx));
    uint n = 1103515245U * ((q.x)^(q.y>>3U));
    return float(n) * (1.0 / float(0xffffffffU));
}

float noise( vec2 p ){
    uvec2 ip = uvec2( floor( p ) );
    vec2 u = fract( p );
    u = u * u * ( 3.0 - 2.0 * u );
	
    float res = mix(
		mix( hash( ip ), hash( ip + uvec2( 1, 0 ) ), u.x ),
		mix( hash( ip + uvec2( 0, 1 ) ), hash( ip + uvec2( 1,1 ) ), u.x ), u.y );
    return res * res;
}

float fBm( vec2 p, int octaves, float lacunarity, float gain ) {
    float freq = 1.0;
    float amp = 0.5;
    float sum = 0.;
    for( int i = 0; i < octaves; i++ ) {
        sum += noise( p * freq ) * amp;
        freq *= lacunarity;
        amp *= gain;
    }
    return sum;
}

void main() {
    vUv = uv;
    vec3 p = position;
    vec2 nUv = round(uv * divide);

    if(p.x < windowSize/2. && p.x > -windowSize/2. && p.y < windowSize/2. && p.y > -windowSize/2.) {
        float f;
        float rand = noise(nUv);
        if(rand < pRect/10.0) {
            f = fBm(nUv*uvRange + vec2(u_time*0.001, u_time*0.001), 50, 1.0, 0.6);
            f = fBm(vec2(nUv.x*f, nUv.y*f)*10.0, 1, 1.0, 1.0);
        } else {
            f = fBm(uv*uvRange + vec2(u_time*0.02, u_time*0.02), 50, 1.0, 0.6);
            f = fBm(vec2(uv.x*f, uv.y*f)*10.0, 1, 1.0, 1.0);
        }

        p.z = f * 100.0;
    }

    vPosition = p;

    vVertex = (modelViewMatrix * vec4(p, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

export default vertexShader;
