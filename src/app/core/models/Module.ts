import {Student} from "./student";
import {Teacher} from "./teacher";
import {Review} from "./review";

export class Module {
  id: number;
  name: string;
  num_videos: number;
  num_labs: number;
  videos : Video[];
  labs : Lab[];
}

export class Video {
  id: number;
  name: string;
  duration: string;
  video_file: File;
  module : Module;

}
export class Lab {
  id: number;
  title: string;
  description: string;
  libraries_requirements: File;
  packages_requirements: File;
  nb_sessions: number;
  vm_characteristics: string; // camelCase naming convention
  labFiles: File;
  session_duration: string;
  is_hosted_on_aws: boolean;
  module : Module;
}
