package com.dhkim.morph.service;

import com.dhkim.morph.domain.User;
import com.dhkim.morph.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserPrincipalDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public UserPrincipalDetailService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username);
        UserPrincipalService userPrincipal = new UserPrincipalService(user);

        return userPrincipal;
    }
}