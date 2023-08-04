const fragmentShader = /* glsl */ `

precision lowp float;
// precision mediump float;

varying vec2 vUv;
varying vec3 vVertex;
varying vec3 vPosition;

uniform vec3 color1;
uniform vec3 color2;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

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

void main() {
    vec2 fuv = -1.0 + 2.0 * vUv;

    float c = fuv.x;
    c = vPosition.z / 50.0;
    // c = smoothstep(0.0, 1.0, c);
    // c += noise(vPosition.xy)*.25;

    vec3 color = mix(color1, color2, c);

    // 光の制御
    vec3 N = normalize(cross(dFdx(vVertex), dFdy(vVertex)));
    const vec3 lightDir1 = vec3(1.0, 0.0, -1.0);
    const vec3 lightDir2 = vec3(-1.0, -1.0, -1.0);
    vec3 L = normalize(lightDir1+lightDir2);
    vec3 diffuse = color * max(dot(N, -L), 0.0);


    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(diffuse, 1.0);
}`;

export default fragmentShader;
