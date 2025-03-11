import { createSelector } from "@ngrx/store";
import { AppState } from "../../interface/app-state.interface";
import { VendorState } from "../../interface/vendor-state.interface";

export const selectVendorsFeature = (state: AppState) => state.vendor;

export const selectDataVendor = createSelector(
    selectVendorsFeature,
    (state: VendorState) => state.data
);

export const selectDataVendorLoading = createSelector(
    selectVendorsFeature,
    (state: VendorState) => state.loading
);

export const selectDataVendorEvaluationCompliance = createSelector(
    selectDataVendor,
    (data) => data.evaluation_compliances
);

export const selectDataVendorEvaluationSST = createSelector(
    selectDataVendor,
    (data) => data.evaluation_sst
);

export const selectDataVendorEvaluationSSTYESNOT = createSelector(
    selectDataVendor,
    (data) => data.evaluation_sst_yes_not
);

export const selectDataVendorLinkCompliance = createSelector(
    selectDataVendor,
    (data) => data.link_compliances
);

export const selectDataVendorLinkSST = createSelector(
    selectDataVendor,
    (data) => data.link_sst
);

