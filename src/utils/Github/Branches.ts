import { Octokit } from "@octokit/core";
const config = require("../../../config.json");

export interface ICreateBranch {
  owner?: string;
  repo: string;
  title: string;
}

export interface IUpdateBranch {
  branchCode: number;
  state: "open" | "closed";
  owner?: string;
  repo: string;
  title: string;
  body: string;
  assignee?: string;
  assignees?: Array<string>;
}

export interface IGetBranch {
  owner: string;
  repo: string;
}
interface IGetResponseData {
  ref: string;
  node_id: string;
  url: string;
  object: {
    sha: string;
    type: string;
    url: string;
  }
}

export async function createBranch(params: ICreateBranch): Promise<any> {
  const { owner, repo, title } = params;


  const octokit = new Octokit({
    auth: config.GITHUB_KEY,
  });
  
  const response = await getBranchs({owner: owner || config.GITHUB_OWNER , repo});

  const ref = response.data.find((item : IGetResponseData) => {
    return (item.url.endsWith('master') || item.url.endsWith('main'));
  }) as IGetResponseData;

  return octokit.request(
    `POST /repos/${owner || config.GITHUB_OWNER }/${repo}/git/refs`,
    {
      ref: `refs/heads/${title}`,
      sha: ref.object.sha,
    },
  );
}

export async function updateBranch(params: IUpdateBranch): Promise<any> {
  const { branchCode, owner, repo, title, body, assignee, assignees } = params;

  const octokit = new Octokit({
    auth: config.GITHUB_KEY,
  });

  const data = {
    repo,
    title,
    body,
    assignee,
    assignees,
  };

  return octokit.request(
    `PATCH /repos/${owner || config.GITHUB_OWNER }/${repo}/git/refs/${branchCode}`,
    {
      ...data,
    },
  );
}

export async function getBranchs(params: IGetBranch): Promise<any> {
  const { owner, repo } = params;

  const octokit = new Octokit({
    auth: config.GITHUB_KEY,
  });


  return octokit.request(
    `GET /repos/${owner || config.GITHUB_OWNER }/${repo}/git/refs`
  );
}
