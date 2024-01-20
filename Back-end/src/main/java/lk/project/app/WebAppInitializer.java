package lk.project.app;

import lk.project.app.filter.CorsFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{WebRootConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebAppConfig.class};
    }


    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

//    to use when @Crossorigin
//    @Override
//    protected Filter[] getServletFilters() {
//        return new Filter[]{new CorsFilter()};
//    }

}
