package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.ColdRoom;
import com.capex.service.ColdRoomService;

@RestController
@RequestMapping("/coldRoom")
public class ColdRoomController {

	@Autowired
	private ColdRoomService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<ColdRoom> getColdRoom() {
 		return service.getColdRoom();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updatecoldRoom(@RequestBody ColdRoom coldRoom,@PathVariable("token")int token) {
 		service.updateColdRoom(coldRoom,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteColdRoom(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteColdRoom(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addColdRoom(@RequestBody ColdRoom coldRoom,@PathVariable("token")int token) {
 		service.addColdRoom(coldRoom,token);
		return true;
	}

	@RequestMapping(value = { "/getColdRoom/{token}/{id}" }, method = RequestMethod.GET)
 	public ColdRoom getColdRoom(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getColdRoom(id);
 	}


}
