export interface DataVendor {
    vendor?:                 VendorInfo;
    evaluation_compliances?: Evaluation[];
    evaluation_sst?:         Evaluation[];
    evaluation_sst_yes_not?: Evaluation[];
    link_sst?:               string;
    link_compliances?:       string;
}

export interface Evaluation {
    id:                          number;
    f_vendor_evaluation_type_id: number;
    question:                    string;
    ask_yes_and_no:              boolean;
    created_at:                  Date;
    updated_at:                  Date;
    options:                     Option[];
}

export interface Option {
    id:                        number;
    f_vendor_eval_question_id: number;
    option:                    string;
}

export interface VendorInfo {
    name:         string;
    document:     string;
    email:        string;
    telephone:    string;
    project_name: string;
    position:     string;
    company_name: string;
}