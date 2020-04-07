export class CcloudSessionExpiredException extends Error {
  constructor(args: any = null) {
    super(args);
    this.name = "CcloudSessionExpired";
    this.message = "Login session has expired";
  }
}

export class TopicAlreadyExistsException extends Error {
  constructor(args: any = null) {
    super(args);
    this.name = "CcloudTopicAlreadyExists";
    this.message = "A Topic with the given name already exists";
  }
}

export class NoTopicFoundException extends Error  {
  constructor(topicName: string) {
    super(null);
    this.name = "NoTopicFoundException";
    this.message = "A Topic with the name: '"+ topicName + "' could not be found";
  }
}

export class ServiceAccountAlreadyExistsException extends Error {
  constructor(args: any = null) {
    super(args);
    this.name = "CcloudServiceAccountAlreadyExists";
    this.message = "A Service account with the given name, but different description already exists";
  }
}

export class CliException extends Error {
  exitCode: number;
  consoleLines: string[];

  constructor(exitCode: number, consoleLines: string[]) {
    super(null);
    this.exitCode = exitCode;
    this.consoleLines = consoleLines;
    this.name = "CliException";
    this.message = "CCloud cli exited with a not ok status code";
  }
}
