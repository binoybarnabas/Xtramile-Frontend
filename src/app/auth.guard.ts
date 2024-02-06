import { inject } from "@angular/core"
import { LoginService } from "./services/loginService/login.service";
import { Router } from "@angular/router";

// To activate employee route for logging in
export const authGuardEmployee = ()=>{

    // const loginService = inject(LoginService);
    const router = inject(Router);

    if(Boolean(sessionStorage.getItem('isEmployeeAuthenticated'))){
        return true;
    }
    else{
    router.navigate(['/login'])
    return false;
    }
}

// To activate manager route for logging in
export const authGuardManager = ()=>{
  
    const router = inject(Router);
    if(Boolean(sessionStorage.getItem('isManagerAuthenticated')))
    {
        return true
    }
    else{
    router.navigate(['/login'])
    return false;
    }
    
}

// To activate travel admin route for logging in
export const authGuardTravelAdmin = ()=>{
   
    const router = inject(Router);

    if(Boolean(sessionStorage.getItem('isTravelAdminAuthenticated'))){
        return true
    }
    else{
    router.navigate(['/login'])
    return false;
    }
    
}

// To activate Finance department route for logging in
export const authGuardFinanceDepartment = ()=>{
   
    const router = inject(Router);

    if(Boolean(sessionStorage.getItem('isFinanceDepartmentAuthenticated'))){
        return true
    }
    else{
    router.navigate(['/login'])
    return false;
    }
    
}