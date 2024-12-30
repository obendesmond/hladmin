export type FileItem = {
  type: "file";
  name: string;
};

export type FolderItem = {
  name: string;
  type: "folder";
  items: (FileItem | FolderItem)[];
};

export interface SandboxListResponse {
  items: FolderItem[];
}

export interface SandboxRunParams {
  cseq_path: string;
}
export interface SandboxRunResponse {
  type: "csequence:run";
  _id: string;
  firestore: {
    csequence_run_id: string;
    command_run_collection: string;
  };
}
