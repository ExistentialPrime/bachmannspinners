// -------------------------------------------------
// Custom Spinner model
// -------------------------------------------------
export class CustomSpinner {

    constructor(data: Partial<CustomSpinner>) {
        Object.assign(this, data);
    }

    id: string;     // GUID for unique identification
    name: string;   // All spinners must have a name!
    components: SpinnerComponent[];
}

// Our base spinner component, from which all other components inherit
export abstract class SpinnerComponent {
    abstract readonly type: string;
    position: number;
}

export class Blade extends SpinnerComponent {

    constructor(data: Partial<Blade>) {
        super();
        Object.assign(this, data);
    }

    readonly type: string = 'Blade';
    color: string;
    size: number;
}

export class Bead extends SpinnerComponent {

    constructor(data: Partial<Bead>) {
        super();
        Object.assign(this, data);
    }

    readonly type: string = 'Bead';
    color: string;
    size: number;
}


