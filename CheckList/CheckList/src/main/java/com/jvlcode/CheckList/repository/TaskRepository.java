package com.jvlcode.CheckList.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jvlcode.CheckList.model.Task;

public interface TaskRepository extends JpaRepository<Task,Long>{
	
}
