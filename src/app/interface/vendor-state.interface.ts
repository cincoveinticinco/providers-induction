import { DataVendor } from "./vendor.interface";

export interface VendorState {
    loading: boolean,
    data: DataVendor,
}