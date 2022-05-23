import { Admin } from "./admin";
import { User } from "./user";

enum JOIN_REQUEST_STATUS {
    WAITING_FOR_HRM = "Waiting for HMR",
    WAITING_FOR_HR_OFFICER = "Waiting for HR Officer",
    ACCEPTED = "Accepted",
    DECLINED = "Declined",
}


export class JoinRequest {
    id: number;
    status: JOIN_REQUEST_STATUS;
    admin: Admin;
    user: User;
    created_at: Date;

    constructor(joinRequest: Partial<JoinRequest>) {
        if (!joinRequest) joinRequest = {};
        this.id = joinRequest.id;
        this.status = joinRequest.status;
        this.created_at = new Date(joinRequest.created_at);
        this.admin = new Admin(joinRequest.admin);
        this.user = new User(joinRequest.user);
    }

    public static fromDTO(dto : any) : JoinRequest | null {
        return dto == null ? null : 
        new JoinRequest({
            id: dto.id,
            status: dto.status == 1 ? JOIN_REQUEST_STATUS.WAITING_FOR_HRM 
            : dto.status == 2 ? JOIN_REQUEST_STATUS.WAITING_FOR_HR_OFFICER
            : dto.status == 3 ? JOIN_REQUEST_STATUS.ACCEPTED
            : dto.status == 4 ? JOIN_REQUEST_STATUS.DECLINED
            : JOIN_REQUEST_STATUS.WAITING_FOR_HRM,
            created_at: dto.created_at,
            admin: Admin.fromDTO(dto.admin),
            user: User.fromDTO(dto.user),
        });
    }

    public static fromDTOArray(dtoArray : any) : JoinRequest[] {
        return dtoArray.map((dto) => JoinRequest.fromDTO(dto));
    }
    public static fromArray(roles: Partial<JoinRequest>[]): JoinRequest[] {
        return roles.map((roles) => new JoinRequest(roles));
    }
}