import { createAction, props } from '@ngrx/store';
import { DataVendor } from '../../interface/vendor.interface';

export const loadVendor = createAction(
    '[VENDOR DATA] Load vendor'
);

export const loadedVendor = createAction(
    '[VENDOR DATA] Loaded success',
    props<{data: DataVendor}>()
);