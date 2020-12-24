import {ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy} from '@angular/router';
import {Injectable} from '@angular/core';

/**
 * 路由复用策略
 */
@Injectable()
export class SimpleReuseStrategy implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {};
  private static waitDelete: string;

  // 删除指定快照
  public static deleteRouteSnapshot(url: string): void {
    const key = url.replace(/\//g, '_');

    if (SimpleReuseStrategy.handlers[key]) {
      delete SimpleReuseStrategy.handlers[key];
    } else {
      SimpleReuseStrategy.waitDelete = key;
    }
  }

  // 删除全部快照
  public static deleteAllRouteSnapshot(): void {
    SimpleReuseStrategy.handlers = {};
  }

  // 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // 路由复用导致退出后首页不刷新，增加特殊处理
    const url = route.url.toString();
    const config: Route = route.routeConfig;
    let shoulsDetach = true;

    // 不需要复用的特殊路由
    const arr = ['login', 'register'];
    for (const item of arr) {
      if (url.indexOf(item) > -1) {
        shoulsDetach = false;
      }
    }

    // 子页面不新建 tab 页，不复用
    if (route.data.isChild) {
      shoulsDetach = false;
    }

    // 地址中带有 ?NO_RELOAD=true 的均不存储快照
    if (route.queryParams && route.queryParams.NO_RELOAD) {
      shoulsDetach = false;
      // 并且删除可能存储的快照
      const key = SimpleReuseStrategy.getRouteUrl(route, 'reload');
      if (SimpleReuseStrategy.handlers[key]) {
        delete SimpleReuseStrategy.handlers[key];
      } else {
        SimpleReuseStrategy.waitDelete = key;
      }
    }

    return config && !config.loadChildren && shoulsDetach;
  }

  /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (SimpleReuseStrategy.waitDelete && SimpleReuseStrategy.waitDelete === SimpleReuseStrategy.getRouteUrl(route)) {
      // 如果待删除是当前路由则不存储快照
      SimpleReuseStrategy.waitDelete = null;
      return;
    }
    SimpleReuseStrategy.handlers[SimpleReuseStrategy.getRouteUrl(route)] = handle;
  }

  // 若 path 在缓存中有的都认为允许还原路由
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!SimpleReuseStrategy.handlers[SimpleReuseStrategy.getRouteUrl(route)];
  }

  // 从缓存中获取快照，若无则返回 null
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }

    return SimpleReuseStrategy.handlers[SimpleReuseStrategy.getRouteUrl(route)];
  }

  // 进入路由触发，判断是否同一路由
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  private static getRouteUrl(route: ActivatedRouteSnapshot, type = 'normal') {
    // 这句代码可以获取当前路由的组件名componentName，但生成环境（打包）将组建名缩写成随机单个字母，
    // 所以需要手动通过route.routeConfig.data['componentName']去获取在路由上自定义的组件名
    let componentShortName = (route.routeConfig.loadChildren
      || route.routeConfig.component.toString().split('(')[0].split(' ')[1]);
    if (route.routeConfig.data && route.routeConfig.data['componentName']) {
      componentShortName = route.routeConfig.data['componentName'];
    }

    if (type === 'reload') {
      // 去除掉 ？ 及之后的参数
      const url = route['_routerState'].url.replace(/\//g, '_');
      return url.substring(0, url.indexOf('?') === -1 ? url.length : url.indexOf('?')) + '_' + componentShortName;
    } else {
      return route['_routerState'].url.replace(/\//g, '_')
        + '_' + componentShortName;
    }
  }
}
