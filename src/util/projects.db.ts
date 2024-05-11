import {codeAndCocktailsImage, batarrImage, sortingVisualizerImage, rfidAttendanceImage} from './../assets/projects';

interface Projects {
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  image?: string;
}

const projects: Projects[] = [
  {
    title: "Code and Cocktails",
    description:
      "My friends and I created an event to bring together all software devs and designers across Africa. And we built our own ticketing system.",
    url: "https://www.codeandcocktails.live/",
    githubUrl: "",
    image: codeAndCocktailsImage.src,
  },
  {
    title: "Sorting Visualizer",
    description:
      "A visualizer for some sorting algorithms.",
    url: "https://abboahene.github.io/SortingVisualizer/",
    githubUrl: "https://github.com/abboahene/SortingVisualizer",
    image: sortingVisualizerImage.src,
  },
  {
    title: "Batarr",
    description:
      "An app to allow users to either give away or bartar trade old items.",
    url: "https://batarr-tech.web.app/login",
    githubUrl: "",
    image: batarrImage.src,
  },
  {
    title: "RFID Attendance System",
    description:
      "Utilizes RFID tags, readers, and a communication protocol to seamlessly log attendance data, enabling real-time monitoring and analysis.",
    url: "https://github.com/abboahene/rfid-attendance",
    githubUrl: "https://github.com/abboahene/rfid-attendance",
    image: rfidAttendanceImage.src,
  },
];


export default projects;