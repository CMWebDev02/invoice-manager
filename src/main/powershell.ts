import { type ChildProcessWithoutNullStreams, spawn } from 'child_process';

// Pseudo Code:
// Summon a powershell and enter the command for getting all volume drive letters.
// Gather all the drive letters output by the powershell
// Add all drive letters to an array
// Close the powershell process and return the array of drive letters.

// https://nodejs.org/api/child_process.html#child_processspawncommand-args-options

class PowerShell {
  _shellOutPut: string[];

  constructor() {
    this._shellOutPut = [];
  }

  //   Initializes the powershell process
  _summonPowerShell(): ChildProcessWithoutNullStreams {
    const process = spawn('powershell.exe', ['(Get-Volume).DriveLetter']);
    return process;
  }

  //   Appends any passed in data to the _shellOutPut array attribute
  _handleOutPut(data: string): void {
    this._shellOutPut.push(data);
  }

  //   Handles the closing of the powershell process, returns true if the process closes correctly or throws an error if the process fails to close properly.
  _handleClosing(code: number | null): boolean {
    if (code !== 0) {
      throw new Error(`Exited with error code ${code}!`);
    } else {
      //   console.log('close');
      return true;
    }
  }

  //   Queries powershell to gather all of the user's drives available on their system,
  //    Returns a promise that resolves with the powershell output data, and rejects with the error that caused the failure.
  async getUserDrives(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      try {
        const process = this._summonPowerShell();

        process.stdout.on('data', (data) => {
          // Passes only the first character, the drive letter, to be appended to the array
          this._handleOutPut(data.toString());
        });

        process.on('close', (code) => {
          const isClosed = this._handleClosing(code);
          if (isClosed) resolve(this._shellOutPut);
        });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}

export async function pullUserDrives(): Promise<string[]> {
  try {
    const newShell = new PowerShell();
    const userDrives = await newShell.getUserDrives();
    return userDrives;
  } catch (error) {
    console.error(error);
    return [];
  }
}
