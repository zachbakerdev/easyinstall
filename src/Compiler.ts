import {Catalog, CatalogApp} from "./Catalog.ts";

export class Compiler {
    public static compile (selection: string[]): Blob {
        const apps: CatalogApp[] = selection.map(id => Catalog.getApp(id)!);
        const installed: string[] = [];
        const adminLines: string [] = [];
        const noAdminLines: string[] = [];

        adminLines.push('winget upgrade winget -h --accept-package-agreements --accept-source-agreements');

        // Generate admin section
        apps.filter(app => app.requiresAdmin).forEach((app: CatalogApp) => {
            // Download Prerequisite Packages
            if (app.prerequisites) {
                app.prerequisites.forEach(prereq => {
                    if (!installed.includes(prereq)) {
                        adminLines.push(`winget install -h -e --id ${prereq} --accept-package-agreements --accept-source-agreements`);
                        installed.push(prereq);
                    }
                });
            }
            // Download Package
            if (!installed.includes(app.id))
                adminLines.push(`winget install -h -e --id ${app.id} --accept-package-agreements --accept-source-agreements`);
            // Run post-install commands
            if (app.postInstall) {
                app.postInstall.forEach(command => {
                    adminLines.push(command);
                })
            }
        });

        // Generate no admin section
        apps.filter(app => !app.requiresAdmin).forEach((app: CatalogApp) => {
            // Download Prerequisite Packages
            if (app.prerequisites) {
                app.prerequisites.forEach(prereq => {
                    if (!installed.includes(prereq)) {
                        noAdminLines.push(`winget install -h -e --id ${prereq} --accept-package-agreements --accept-source-agreements`);
                        installed.push(prereq);
                    }
                });
            }
            // Download Package
            if (!installed.includes(app.id))
                noAdminLines.push(`winget install -h -e --id ${app.id} --accept-package-agreements --accept-source-agreements`);
            // Run post-install commands
            if (app.postInstall) {
                app.postInstall.forEach(command => {
                    noAdminLines.push(command);
                })
            }
        });

        const lines = [];

        lines.push('@echo off');
        lines.push('whoami /groups | findstr /b BUILTIN\\Administrators | findstr /c:"Enabled group" && goto :admin');
        lines.push('echo starting administrator session');
        lines.push('powershell -Command "Start-Process -FilePath %0 -Verb RunAs" -Wait');
        lines.push('echo installing no admin packages');

        // Inject non-admin lines
        for (const line of noAdminLines) {
            lines.push(line);
        }

        lines.push('pause');
        lines.push('exit /b 0');
        lines.push(':admin');
        lines.push('echo installing admin packages');

        for (const line of adminLines) {
            lines.push(line);
        }

        lines.push('exit /b 0');

        return new Blob([lines.join('\n')], {type: "text/plain"});
    }
}
