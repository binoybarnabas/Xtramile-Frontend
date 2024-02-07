import { inject } from "@angular/core"
import { LoginService } from "./services/loginService/login.service";
import { Router } from "@angular/router";

// To activate employee route for logging in
export const authGuard = ()=>{

    // const loginService = inject(LoginService);
    const router = inject(Router);

    if(Boolean(localStorage.getItem('isAuthenticated'))){
        return true;
    }
    else{
    router.navigate(['/login'])
    return false;
    }
    
}