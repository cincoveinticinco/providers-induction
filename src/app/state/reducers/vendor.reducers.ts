import { createReducer, on } from "@ngrx/store";
import { VendorState } from "../../interface/vendor-state.interface";
import { loadedVendor, loadVendor } from "../actions/vendor.actions";
import { DataVendor } from "../../interface/vendor.interface";

export const initialState: VendorState = { loading: false, data: {} };
export const vendorFeatureKey = 'vendor';

export const vendorReducer = createReducer(
    initialState,
    on(loadVendor, (state) => {
        return { ...state, loading: false }
    }),
    on(loadedVendor, (state, {data}) => {
        return { ...state, loading: true, data }
    })
);