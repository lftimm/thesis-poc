varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float uLength; // m
uniform float uRadius; // m

const float P = 1000.0e3; // N
const float E = 40000.0e6 ; // Pa

mat4 displacement(float dx, float dy, float dz) {
    return mat4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        dx, dy, dz, 1
    );
}

float beamDeflection(float x,float I,float L) {
    return P/(6.0*E*I)*pow(x,2.0)*(3.0*L-x);
}

float beamRotation(float x, float I, float L) {
    return P/(2.0*E*I) * x * (2.0*L - x);
}

mat4 rotationX(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(
        1, 0, 0, 0, 
        0,  c,  s, 0,
        0, -s,  c, 0,
        0, 0, 0, 1
    );
}

void main() {
    float I = 3.1415*pow(uRadius,4.0)/4.0; // m^4
    float L = uLength; // m
    float deflection = beamDeflection(position.y, I, L); // scale for visibility
    float angle = beamRotation(position.y, I, L);        // scale for visibility   vec4 newPos = displacement(0.0, 0.0, deflection) * rotationX(angle) * vec4(position, 1.0);
    vec4 newPos = displacement(0.0, 0.0, deflection) * rotationX(angle) * vec4(position, 1.0);
    vUv = uv;
    vNormal = normal;
    vPosition = vec3(newPos.x,newPos.y,newPos.z);
    gl_Position = projectionMatrix * modelViewMatrix * newPos;
}