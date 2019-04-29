#version 430

in vec3 vertPos; //camera position
in vec3 N;
in vec3 lightPos; //light position
/*TODO:: Complete your shader code for a full Phong shading*/ 

uniform vec3 Kd;            // Diffuse reflectivity
uniform vec3 Ld;            // Diffuse light intensity
uniform vec3 La;
uniform vec3 Ka;
uniform vec3 Ks;
uniform vec3 Ls;

uniform vec3 cameraPos;

// complete to a full phong shading
layout( location = 0 ) out vec4 FragColour;

void main() {

//Calculate the light vector
   vec3 L = normalize(lightPos - vertPos); 

   //Calculate Reflection
   vec3 R = reflect(-L,N);

   //Calculate the V
   vec3 V = normalize(cameraPos - vertPos);


   //calculate Diffuse Light Intensity making sure it is not negative and is clamped 0 to 1  
	vec4 Id = vec4(Kd, 1.0) * vec4(Ld,1.0) * max(dot(N,L), 0.0);// Why do we need vec4(vec3)?



   //ambient
    vec4 Ia = vec4(Ka, 1.0) * vec4(La, 1.0);


   //specular
   vec4 Is = vec4(Ks,1.0) * vec4(Ls, 1.0) * pow(max(dot(V,R), 0.0), 57.0);




   //Multiply the Reflectivity by the Diffuse intensity
   FragColour = clamp(Ia + Id + Is , 0.0 , 1.0);

}
