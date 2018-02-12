package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.User;
import com.capex.service.UserService;
import com.capex.util.SessionUtil;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService service;
	
	@RequestMapping(value="/currentUser",method=RequestMethod.POST)
	public User currentUser() throws BusinessException{
 		return service.getUserLog(SessionUtil.getUserId());
	}
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public User loginUser(@RequestBody User user) throws BusinessException{
		
		return service.loginUser(user);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public int addUser(@RequestBody User user,@PathVariable("token")String token) throws BusinessException{
 		service.addUser(user,token);
		return user.getId();
	}
	
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public int updateUser(@RequestBody User user,@PathVariable("token")int token) throws BusinessException{
		
		System.out.println("update control "+user.getId());
		
		service.updateUser(user,token);
		return user.getId();
	}
	
	@RequestMapping(value="/all/{token}",method=RequestMethod.GET)
	public List<User> getAll(@PathVariable("token")int token) throws BusinessException{
		
		return service.getAll(token);
	}
 
	@RequestMapping(value="/updatePass/{token}/{oldpass}/{newpass}",method=RequestMethod.POST)
	public boolean updatePassword(@PathVariable("token")String token,@PathVariable("oldpass")String oldpass,@PathVariable("newpass")String newpass) throws BusinessException{
		
		return service.updatePassword(token,oldpass,newpass);
	}
	
	@RequestMapping(value="/resetpass/{token}/{user}/{newpass}",method=RequestMethod.POST)
	public boolean resetPassword(@PathVariable("token")String token,@PathVariable("user")int user,@PathVariable("newpass")String newpass) throws BusinessException{
		
		return service.resetPassword(token,user,newpass);
	}
	
	@RequestMapping(value="/delete1/{token}/{id}",method=RequestMethod.POST)
	public boolean deleteUser(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
		return service.deleteUser(token,id);
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
	public boolean deleteUserTotal(@PathVariable("token")int token,@PathVariable("id")int id) throws BusinessException{
		
		System.out.println("deleteUserTotal");
		return service.deleteUserTotal(token,id);
	}
 
	@RequestMapping(value="/getuser/{token}/{id}",method=RequestMethod.GET)
	public User getUser(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
		
 		return service.getUser(token,id);
	}
	
	@RequestMapping(value="/changePassword/{token}/{oldpassword}/{newpassword}",method=RequestMethod.POST)
	public boolean changePassword(@PathVariable("token")String token,@PathVariable("oldpassword")String oldpassword,@PathVariable("newpassword")String newpassword) throws BusinessException{
		
		return service.changePassword(token,oldpassword,newpassword);
	}

}
