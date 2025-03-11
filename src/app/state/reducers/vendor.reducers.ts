import { createReducer, on } from "@ngrx/store";
import { VendorState } from "../../interface/vendor-state.interface";
import { loadedVendor, loadVendor } from "../actions/vendor.actions";

export const initialState: VendorState = { loading: false, data: {} };
export const vendorFeatureKey = 'vendor';

export const vendorReducer = createReducer(
    initialState,
    on(loadVendor, (state) => {
        return { ...state, loading: false }
    }),
    on(loadedVendor, (state, {data}) => {
        console.log(data)
        return { ...state, loading: true, data }
    })
);