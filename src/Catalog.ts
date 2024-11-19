import catalog from './catalog.json';

export type CatalogGroup = {
    name: string;
    id: string;
    subgroups?: CatalogGroup[];
}

export type CatalogApp = {
    name: string;
    id: string;
    requiresAdmin: boolean;
    groups: string[];
    prerequisites?: string[];
    postInstall?: string[];
}

export class Catalog {
    private constructor() {}

    public static getGroups (): CatalogGroup[] {
        return catalog.groups;
    }

    public static getGroup (id: string): CatalogGroup | null {
        return catalog.groups.find(group => group.id === id) ?? null;
    }

    public static getApps (filterGroup?: string): CatalogApp[] {
        if (filterGroup)
            return catalog.apps.filter(app => app.groups.includes(filterGroup));
        else
            return catalog.apps;
    }

    public static getApp (id: string): CatalogApp | null {
        return catalog.apps.find(app => app.id === id) ?? null;
    }
}
