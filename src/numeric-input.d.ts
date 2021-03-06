import { Decorator, Plugin, Macro } from 'ractive';

export function numeric(opts?: DecoratorOpts): Decorator;

export interface DecoratorOpts {
  decimal?: number;
  whole?: number;
  prefix?: string;
  suffix?: string;
}

export interface PluginOpts extends DecoratorOpts {
  name?: string;
}

export function plugin(options?: PluginOpts): Plugin;

export default plugin;