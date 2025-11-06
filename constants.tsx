
import React from 'react';
import { Mode } from './types';
import { TryOnIcon, RoomRedesignIcon, HairstyleIcon, TravelIcon, PersonaIcon, PetIcon, DreamBuilderIcon, MoodIcon, ThreeDIcon } from './components/icons';

export const MODES: Mode[] = [
  {
    id: 'fashion',
    title: 'Try-On Fashion',
    description: 'Virtually try on different outfits and styles.',
    icon: <TryOnIcon />,
    analysisPrompt: 'Analyze this photo. Identify all clothing items worn by the person. Suggest 3 stylish and specific alternatives, like "change the t-shirt to a black leather jacket" or "make the pants dark-wash jeans".',
    placeholderPrompt: 'e.g., change to a red dress',
    aboutText: "Upload a photo of a person and use suggestions or your own ideas to change their clothing. Experiment with everything from casual wear to formal attire.",
    exampleImages: {
      before: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1',
    },
    examplePrompt: 'Change her white button-up shirt to a stylish dark floral-print blouse and add a gold necklace.',
  },
  {
    id: 'beauty',
    title: 'Hairstyle/Makeup',
    description: 'Experiment with new hairstyles and makeup looks.',
    icon: <HairstyleIcon />,
    analysisPrompt: 'Analyze this portrait. Identify the person\'s hair and makeup. Suggest 3 specific beauty transformations, such as "change hair to a vibrant auburn color" or "add a dramatic smoky eyeshadow look".',
    placeholderPrompt: 'e.g., give them curly blonde hair',
    aboutText: "Transform hairstyles and makeup in your portraits. Try new hair colors, styles, or add makeup effects like lipstick and eyeshadow to see a new you.",
    exampleImages: {
      before: 'https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1',
    },
    examplePrompt: 'Give her long, wavy, vibrant red hair and add subtle, elegant evening makeup with a bold red lipstick.',
  },
  {
    id: 'persona',
    title: 'Persona Transformation',
    description: 'Transform into different characters or art styles.',
    icon: <PersonaIcon />,
    analysisPrompt: 'Analyze this portrait. Suggest 3 imaginative persona transformations, such as "transform the person into a sci-fi cyborg", "reimagine them as a fantasy elf warrior", or "render the portrait in a vibrant pop-art style".',
    placeholderPrompt: 'e.g., make them a pirate',
    aboutText: "Reimagine yourself or your friends as different characters. Become a superhero, a historical figure, or even a creature from fantasy, all from a single photo.",
    exampleImages: {
      before: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1',
    },
    examplePrompt: 'Transform the person into a futuristic cyborg with glowing neon circuits on their face and metallic skin.',
  },
  {
    id: 'mood',
    title: 'Mood & Emotion Filters',
    description: 'Apply artistic filters to change the emotional tone.',
    icon: <MoodIcon />,
    analysisPrompt: 'Analyze this photo. Identify the current mood and lighting. Suggest 3 distinct mood transformations, such as "apply a joyful, sunny filter with warm tones", "add a dramatic, film noir lighting effect", or "give it a dreamy, ethereal glow".',
    placeholderPrompt: 'e.g., make it look like a vintage film photo',
    aboutText: 'Instantly change the feeling of your photos. Apply filters to make a scene look happy, dramatic, nostalgic, or futuristic. It\'s a one-click way to set the emotional tone.',
    exampleImages: {
      before: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1',
    },
    examplePrompt: 'Transform the mood to one of pure surprise and wonder. Make her eyes slightly wider, and change the background to a fantastical, swirling nebula of vibrant colors, as if she\'s just witnessed a cosmic event.',
  },
  {
    id: '3d',
    title: '3D Model Styling',
    description: 'Reimagine your objects as 3D-style renders.',
    icon: <ThreeDIcon />,
    analysisPrompt: 'Analyze the main object in this photo. Suggest 3 different 3D-style renderings, such as "recreate the object as a blue wireframe model", "render it as a low-poly object with flat shading", or "show it as a polished, photorealistic 3D render".',
    placeholderPrompt: 'e.g., render as a clay model',
    aboutText: 'Turn your photos into stunning 3D-style art. This mode reimagines your subject as a wireframe, a polygonal model, or a polished 3D render, creating a unique artistic effect from a 2D image.',
    exampleImages: {
      before: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    },
    examplePrompt: 'Render the sneaker in this image as a detailed, high-resolution 3D wireframe model with a glowing purple neon effect on a dark background.',
  },
  {
    id: 'room',
    title: 'Room Redesign',
    description: 'Reimagine your living space with new furniture and colors.',
    icon: <RoomRedesignIcon />,
    analysisPrompt: 'Analyze this room photo. Identify key furniture, wall colors, and overall style. Suggest 3 specific redesign ideas, such as "paint the walls a calming sage green" or "replace the coffee table with a rustic wooden one".',
    placeholderPrompt: 'e.g., add a modern leather sofa',
    aboutText: "See your room in a new light. Upload a photo of any space and change wall colors, swap furniture, or completely redesign the decor to match your dream style.",
    exampleImages: {
      before: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    },
    examplePrompt: 'Change the room to a minimalist Scandinavian design with light wood furniture, white walls, and add a large, vibrant abstract painting on the main wall.',
  },
  {
    id: 'travel',
    title: 'Travel/Scene Swap',
    description: 'Place yourself in breathtaking new locations.',
    icon: <TravelIcon />,
    analysisPrompt: 'Analyze this photo. Identify the main subject and the background scene. Suggest 3 creative scene swaps, like "place the subject on a beach in Bali at sunset" or "put the subject in front of the Eiffel Tower".',
    placeholderPrompt: 'e.g., place them in Times Square',
    aboutText: "Travel the world without leaving home. Upload a picture and instantly transport the subject to a new location, from famous landmarks to imaginary landscapes.",
    exampleImages: {
      before: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1',
    },
    examplePrompt: 'Place the person on a majestic mountain peak at sunrise, with misty clouds below.',
  },
  {
    id: 'object',
    title: 'Pet/Object Customization',
    description: 'Give your pets or objects a fun, creative makeover.',
    icon: <PetIcon />,
    analysisPrompt: 'Analyze this photo of an object or pet. Suggest 3 fun and creative customizations, such as "give the cat a tiny superhero cape", "make the car look like it\'s made of polished chrome", or "turn the coffee mug into a galaxy pattern".',
    placeholderPrompt: 'e.g., turn the dog into a fluffy sheep',
    aboutText: "Unleash your creativity on pets and objects. Add fun accessories to your furry friends, change the color of your car, or give any object a magical new look.",
    exampleImages: {
      before: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    },
    examplePrompt: 'Give the cat a tiny, dapper top hat and a monocle.',
  },
  {
    id: 'dream',
    title: 'Dream Builder',
    description: 'Free your imagination with no limits.',
    icon: <DreamBuilderIcon />,
    analysisPrompt: 'Analyze this image and describe its key elements. Suggest 3 fantastical and imaginative alterations that completely change the scene, such as "imagine this city with floating cars and neon skyscrapers" or "turn this landscape into an alien jungle".',
    placeholderPrompt: 'e.g., add a floating castle in the sky',
  },
];