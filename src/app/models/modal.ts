// -------------------------------------------------
// Modal model
// -------------------------------------------------
export interface Modal {
    title: string;
    message: string;
    showCancel?: boolean;
    confirmText?: string;
    data?: any[];
}