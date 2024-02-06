import { inject } from "@angular/core"
import { LoginService } from "./services/loginService/login.service";
import { Router } from "@angular/router";

export const authGuardEmployee = ()=>{

    const loginService = inject(LoginService);
    const router = inject(Router);

    if(Boolean(localStorage.getItem('isEmployeeAuthenticated'))){
        return true
    }
    else{
    router.navigate(['/login'])
    return false;
    }
}

export const authGuardManager = ()=>{
    const loginService = inject(LoginService);
    const router = inject(Router);
    if(Boolean(localStorage.getItem('isManagerAuthenticated')))
    {
        return true
    }
    else{
    router.navigate(['/login'])
    return false;
    }
    
}

export const authGuardTravelAdmin = ()=>{

    const loginService = inject(LoginService);
    const router = inject(Router);

    if(Boolean(localStorage.getItem('isTravelAdminAuthenticated'))){
        return true
    }
    else{
    router.navigate(['/login'])
    return false;
    }
    
}

export const authGuardFinanceDepartment = ()=>{

    const loginService = inject(LoginService);
    const router = inject(Router);

    if(Boolean(localStorage.getItem('isFinanceDepartmentAuthenticated'))){
        return true
    }
    else{
    router.navigate(['/login'])
    return false;
    }
    
}