import { inject } from "@angular/core"
import { LoginService } from "./services/loginService/login.service";
import { Router } from "@angular/router";

export const employeeAuthGuard = ()=>{

    // const loginService = inject(LoginService);
    const router = inject(Router);
    const userData = localStorage.getItem('userData');
    const parsedUserData = userData ? JSON.parse(userData) : ''
    if(Boolean(localStorage.getItem('isAuthenticated')) && parsedUserData.role=='Employee'){
        return true;
    }
    else{
    router.navigate(['/login'])
    return false;
    }
    
}

export const managerAuthGuard = ()=>{

      // const loginService = inject(LoginService);
      const router = inject(Router);
      const userData = localStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : ''
      if(Boolean(localStorage.getItem('isAuthenticated')) && parsedUserData.role=='Manager' && parsedUserData.department!='TA'){
          return true;
      }
      else{
      router.navigate(['/login'])
      return false;
      }
    
}

export const travelAdminAuthGuard = ()=>{

    // const loginService = inject(LoginService);
    const router = inject(Router);
    const userData = localStorage.getItem('userData');
    const parsedUserData = userData ? JSON.parse(userData) : ''
    if(Boolean(localStorage.getItem('isAuthenticated')) && parsedUserData.role=='Manager' && parsedUserData.department=='TA'){
        return true;
    }
    else{
    router.navigate(['/login'])
    return false;
    }
    
}
