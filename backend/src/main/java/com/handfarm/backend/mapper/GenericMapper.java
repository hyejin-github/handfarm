package com.handfarm.backend.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

public interface GenericMapper<Dto, Entity>{
    Dto toDto(Entity e);
    Entity toEntity(Dto d);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDto(Dto dto, @MappingTarget Entity entity);

}
