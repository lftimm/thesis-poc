varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float uLength; // m
uniform float uRadius; // m
uniform float uLoad; // N

const float E = 40000.0e6 ;

mat4 displacement(float dx, float dy, float dz) {
    return mat4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        dx, dy, dz, 1
    );
}

float beamDeflection(float x,float I,float L) {
    return uLoad/(6.0*E*I)*pow(x,2.0)*(3.0*L-x);
}

void main() {
    float I = 3.1415*pow(2.0*uRadius,4.0)/64.0; // m^4
    float L = uLength; // m
    float xOffset = L / 2.0;
    float y = position.y - xOffset;
    float deflection = beamDeflection(y, I, L);
    vec4 newPos = displacement(0.0, 0.0, deflection) * vec4(position, 1.0);
    vUv = uv;
    vNormal = normal;
    vPosition = vec3(newPos.x,newPos.y,newPos.z);
    gl_Position = projectionMatrix * modelViewMatrix * newPos;
}